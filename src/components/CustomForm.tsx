import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { t } from 'i18next';
import { useCallback, useState } from 'react';
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from '@vis.gl/react-google-maps';

const formSchema = z.object({
  crop: z
    .string()
    .min(1, { message: 'Property is required' })
    .nonempty({ message: 'Property is required' }),
  size: z
    .string()
    .min(1, { message: 'Property is required' })
    .nonempty({ message: 'Property is required' }),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});

const CustomForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      crop: '',
      size: '',
      location: {
        latitude: 0,
        longitude: 0,
      },
    },
  });

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  const navigate = useNavigate();
  const navigateNextPage = () => {
    navigate('/home');
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    localStorage.setItem('formData', JSON.stringify(values));
    console.log('Form Data Saved:', values);
    navigateNextPage();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Crops Selection */}
        <FormField
          control={form.control}
          name='crop'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className='text-[12px] text-white font-light'>
                  {t('firstPage.textInputs.crops.title')}
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className='bg-[#303030] border-[#757D86] ring-offset-1 ring-offset-[#DCF730] hover:border-[#DCF730] text-white placeholder:text-[#C8D0D8] placeholder:font-light'>
                      <SelectValue
                        placeholder={t('firstPage.textInputs.crops.subtitle')}
                      />
                    </SelectTrigger>
                    <SelectContent className='bg-[#303030] border-[#757D86] text-white'>
                      <SelectItem value='corn'>Corn</SelectItem>
                      <SelectItem value='soybean'>Soybean</SelectItem>
                      <SelectItem value='wheat'>Wheat</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* Size Selection */}
        <FormField
          control={form.control}
          name='size'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className='text-[12px] text-white font-light'>
                  {t('firstPage.textInputs.state.title')}
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className='bg-[#303030] border-[#757D86] ring-offset-1 ring-offset-[#DCF730] hover:border-[#DCF730] text-white placeholder:text-[#C8D0D8] placeholder:font-light'>
                      <SelectValue
                        placeholder={t('firstPage.textInputs.state.subtitle')}
                      />
                    </SelectTrigger>
                    <SelectContent className='bg-[#303030] border-[#757D86] text-white'>
                      <SelectItem value='1 to 3hectares'>
                        1 to 3 hectares
                      </SelectItem>
                      <SelectItem value='4 to 7 hectares'>
                        4 to 7 hectares
                      </SelectItem>
                      <SelectItem value='7 to 10 hectares'>
                        7 to 10 hectares
                      </SelectItem>
                      <SelectItem value='more than 10 hecares'>
                        more than 10 hectares
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
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
                <FormLabel className='text-[12px] text-white font-light'>
                  {t('firstPage.textInputs.map.title')}
                </FormLabel>
                <APIProvider apiKey={'AIzaSyBov7ia2sok01HxqfVCHol3FB50lnHT1ws'}>
                  <div className='w-full h-72 rounded-lg border border-[#757D86] box-border overflow-hidden'>
                    <Map
                      mapId={'b58bb86d0be9ae4c'}
                      onClick={handleMapClick}
                      defaultCenter={coordinates}
                      colorScheme='FOLLOW_SYSTEM'
                      defaultZoom={4}
                      gestureHandling={'greedy'}
                      disableDefaultUI={true}>
                      <AdvancedMarker position={coordinates}>
                        <Pin
                          background={'#DCF730'}
                          borderColor={'#96a81f'}
                          glyphColor={'#484848'}
                        />
                      </AdvancedMarker>
                    </Map>
                  </div>
                </APIProvider>
              </FormItem>
            );
          }}></FormField>

        <button
          type='submit'
          className='flex w-full h-[45px] mt-[40px] justify-center items-center rounded-[12px] bg-[#DCF730] text-[18px] text-[#282828] font-normal'>
          {t('buttons.continue', 'Submit')}
        </button>
      </form>
    </Form>
  );
};

export default CustomForm;
