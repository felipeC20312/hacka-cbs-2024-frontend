import { useWizard } from 'react-use-wizard';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '../ui/textarea';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from './CustomFormContext';
import { Checkbox } from '../ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { LucideArrowRight } from 'lucide-react';

const formSchema = z.object({
  analysis_type: z
    .array(z.string())
    .min(1, { message: 'É necessário selecionar pelo menos uma opção.' }),
  search_objective: z
    .string()
    .min(1, { message: 'O objetivo da busca é obrigatório.' })
    .trim(),
  main_problems: z
    .string()
    .min(1, { message: 'A descrição dos problemas principais é obrigatória.' })
    .trim(),
});

const Step2 = () => {
  const { handleStep } = useWizard();
  const { formData, setFormData } = useFormContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...formData,
      analysis_type: [],
    },
  });

  const navigate = useNavigate();

  const navigateNextPage = () => {
    navigate('/home');
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const updatedFormData = { ...formData, ...values };
    setFormData(updatedFormData);
    localStorage.setItem('formData', JSON.stringify(updatedFormData));
    console.log(updatedFormData);
    navigateNextPage();
  };

  handleStep(() => {
    alert('Going to step 2');
  });

  return (
    <div className='flex flex-col w-full p-4 gap-4'>
      <div>
        <p className='text-[18px] font-normal'>
          {t('firstPage.custom_form_page2.title')}
        </p>
        <p className='text-[14px] font-thin'>
          {t('firstPage.custom_form_page2.subtitle')}
        </p>
        <div className='w-full border-b border-border mt-3' />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-3'>
          {/* analysis_type */}
          <FormField
            control={form.control}
            name='analysis_type'
            render={({ field }) => {
              const currentValues = field.value || [];

              return (
                <FormItem>
                  <FormLabel className='text-[14px] text-text-main font-normal'>
                    {t(
                      'firstPage.custom_form_page2.formFieldLabels.analysis_type.title'
                    )}
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className='w-full bg-transparent rounded-[8px] text-text-second text-[14px] font-light justify-start flex-wrap text-left border-border border-[1px] p-2'>
                        {currentValues.length > 0 ? (
                          <div className='flex flex-wrap gap-1'>
                            {currentValues.map((value) => (
                              <span
                                key={value}
                                className='bg-gray-100 px-2 py-1 rounded text-sm text-gray-800'>
                                {value}
                              </span>
                            ))}
                          </div>
                        ) : (
                          t(
                            'firstPage.custom_form_page2.formFieldLabels.analysis_type.subtitle'
                          )
                        )}
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className='w-[200px] border-border bg-white rounded-[8px] p-4'>
                      <div className='flex flex-col gap-2'>
                        {[
                          {
                            label: 'Tendência do Custo Hídrico',
                            value: 'Tendência do Custo Hídrico',
                          },
                          {
                            label: 'Eficiência Energética Solar',
                            value: 'Eficiência Energética Solar',
                          },
                          {
                            label:
                              'Tendência de Risco Climático para Infraestruturas',
                            value:
                              'Tendência de Risco Climático para Infraestruturas',
                          },
                          {
                            label: 'Previsão da Qualidade do Ar',
                            value: 'Previsão da Qualidade do Ar',
                          },
                        ].map((item) => (
                          <div
                            key={item.value}
                            className='flex items-center gap-2'>
                            <Checkbox
                              id={item.value}
                              checked={currentValues.includes(item.value)}
                              onCheckedChange={(checked) => {
                                const updatedValues = checked
                                  ? [...currentValues, item.value]
                                  : currentValues.filter(
                                      (v) => v !== item.value
                                    );
                                field.onChange(updatedValues);
                              }}
                            />
                            <label
                              htmlFor={item.value}
                              className='text-sm text-gray-800'>
                              {item.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage className='text-error text-[12px] font-normal' />
                </FormItem>
              );
            }}
          />

          {/* search_objective */}
          <FormField
            control={form.control}
            name='search_objective'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className='text-[14px] text-text-main font-normal'>
                    {t(
                      'firstPage.custom_form_page2.formFieldLabels.search_objective.title'
                    )}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      onChange={field.onChange}
                      value={field.value}
                      className='h-[80px] text-text-second text-[14px] font-light border-border bg-transparent rounded-[8px] placeholder-text-second p-[8px]'
                      placeholder={t(
                        'firstPage.custom_form_page2.formFieldLabels.search_objective.subtitle'
                      )}
                    />
                  </FormControl>
                  <FormMessage className='text-error text-[12px] font-normal' />
                </FormItem>
              );
            }}
          />

          {/* main_problems */}
          <FormField
            control={form.control}
            name='main_problems'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className='text-[14px] text-text-main font-normal'>
                    {t(
                      'firstPage.custom_form_page2.formFieldLabels.main_problems.title'
                    )}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      onChange={field.onChange}
                      value={field.value}
                      className='h-[80px] text-text-second text-[14px] font-light border-border bg-transparent rounded-[8px] placeholder-text-second p-[8px]'
                      placeholder={t(
                        'firstPage.custom_form_page2.formFieldLabels.main_problems.subtitle'
                      )}
                    />
                  </FormControl>
                  <FormMessage className='text-error text-[12px] font-normal' />
                </FormItem>
              );
            }}
          />

          <button
            type='submit'
            className='relative flex w-full h-[48px] mt-1 justify-center items-center rounded-full bg-button text-white font-normal'>
            {t('buttons.dashboard_create')}
            <div className='absolute flex items-center justify-center right-1 w-[40px] aspect-square bg-second rounded-full'>
              <LucideArrowRight color='#0f172a' />
            </div>
          </button>
        </form>
      </Form>

      <div></div>
    </div>
  );
};

export default Step2;
