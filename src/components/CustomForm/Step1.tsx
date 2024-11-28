import { useCallback, useState } from 'react';
import { useWizard } from 'react-use-wizard';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from '@vis.gl/react-google-maps';

import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { useFormContext } from './CustomFormContext';
import { LucideArrowRight } from 'lucide-react';

const formSchema = z.object({
  business_name: z
    .string()
    .min(1, { message: 'Business name is required' })
    .max(100, { message: 'Business name cannot exceed 100 characters' })
    .nonempty({ message: 'Business name cannot be empty' }),

  business_type: z
    .string()
    .min(1, { message: 'Business type is required' })
    .max(50, { message: 'Business type cannot exceed 50 characters' })
    .nonempty({ message: 'Business type cannot be empty' }),

  location: z.object({
    latitude: z
      .number()
      .min(-90, { message: 'Latitude must be between -90 and 90' })
      .max(90, { message: 'Latitude must be between -90 and 90' })
      .refine((value) => value !== 0, { message: "Latitude can't be 0" }),

    longitude: z
      .number()
      .min(-180, { message: 'Longitude must be between -180 and 180' })
      .max(180, { message: 'Longitude must be between -180 and 180' })
      .refine((value) => value !== 0, { message: "Longitude can't be 0" }),
  }),
});

const Step1 = () => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const { formData, setFormData } = useFormContext();
  const { nextStep } = useWizard();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setFormData((prev) => ({ ...prev, ...values }));
    nextStep();
  };

  const handleMapClick = useCallback(
    (event: any) => {
      const newCoords = {
        lat: event.detail.latLng.lat,
        lng: event.detail.latLng.lng,
      };
      setCoordinates(newCoords);
      form.setValue('location', {
        latitude: newCoords.lat,
        longitude: newCoords.lng,
      });
    },
    [form]
  );

  return (
    <div className='flex flex-col w-full p-4 gap-4'>
      <div>
        <p className='text-[18px] font-normal'>
          {t('firstPage.custom_form_page1.title')}
        </p>
        <p className='text-[14px] font-thin'>
          {t('firstPage.custom_form_page1.subtitle')}
        </p>
        <div className='w-full border-b border-border mt-3' />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-3'>
          {/* business_name */}
          <FormField
            control={form.control}
            name='business_name'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className='text-[14px] text-text-main font-normal'>
                    {t(
                      'firstPage.custom_form_page1.formFieldLabels.business_name.title'
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      onChange={field.onChange}
                      value={field.value}
                      className='text-text-second text-[14px] font-light border-border bg-transparent rounded-[8px] placeholder-text-second'
                      placeholder={t(
                        'firstPage.custom_form_page1.formFieldLabels.business_name.subtitle'
                      )}
                    />
                  </FormControl>
                  <FormMessage className='text-error text-[12px] font-normal' />
                </FormItem>
              );
            }}
          />

          {/* business_type */}
          <FormField
            control={form.control}
            name='business_type'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className='text-[14px] text-text-main font-normal'>
                    {t(
                      'firstPage.custom_form_page1.formFieldLabels.business_type.title'
                    )}
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className='border-border bg-transparent rounded-[8px] text-text-second text-[14px] font-light'>
                        <SelectValue
                          placeholder={t(
                            'firstPage.custom_form_page1.formFieldLabels.business_type.subtitle'
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent className='border-border bg-white rounded-[8px]'>
                        <SelectItem value='textil'>Têxtil</SelectItem>
                        <SelectItem value='mineracao'>Mineração</SelectItem>
                        <SelectItem value='mineracao'>Alimentícia</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className='text-error text-[12px] font-normal' />
                </FormItem>
              );
            }}
          />

          {/* Google Map */}
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className='text-[14px] text-text-main font-normal'>
                    {t(
                      'firstPage.custom_form_page1.formFieldLabels.location.title'
                    )}
                  </FormLabel>
                  <APIProvider
                    apiKey={'AIzaSyBov7ia2sok01HxqfVCHol3FB50lnHT1ws'}>
                    <div className='w-full h-72 rounded-[10px] box-border overflow-hidden'>
                      <Map
                        mapId={'b58bb86d0be9ae4c'}
                        onClick={handleMapClick}
                        defaultCenter={coordinates}
                        colorScheme='LIGTH'
                        defaultZoom={4}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}>
                        <AdvancedMarker position={coordinates}>
                          <Pin
                            background={'#326afd'}
                            borderColor={'#326afd'}
                            glyphColor={'#ffffff'}
                          />
                        </AdvancedMarker>
                      </Map>
                    </div>
                  </APIProvider>
                  <FormMessage className='text-error text-[12px] font-normal' />
                </FormItem>
              );
            }}></FormField>

          <button
            type='submit'
            className='relative flex w-full h-[48px] mt-1 justify-center items-center rounded-full bg-button text-white font-normal'>
            {t('buttons.continue', 'Submit')}
            <div className='absolute flex items-center justify-center right-1 w-[40px] aspect-square bg-second rounded-full'>
              <LucideArrowRight color='#0f172a' />
            </div>
          </button>
        </form>
      </Form>
    </div>
  );
};

export default Step1;
