import { Wizard } from 'react-use-wizard';
import { FormProvider } from './CustomFormContext';
import Step1 from './Step1';
import Step2 from './Step2';

const CustomForm = () => {
  return (
    <FormProvider>
      <Wizard>
        <Step1 />
        <Step2 />
      </Wizard>
    </FormProvider>
  );
};

export default CustomForm;
