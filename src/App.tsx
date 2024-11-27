import DeviceVerifier from './components/DeviceVerifier/DeviceVerifier';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import RoutesApp from './RoutesApp';
import { Toaster } from 'sonner';
import i18n from './lang/i18n';
import './App.css';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <DeviceVerifier>
          <RoutesApp />
          <Toaster position='top-center' />
        </DeviceVerifier>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
