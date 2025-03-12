import Main from '../../pages/main/main';

type AppProps = {
  placesToStay: number;
}

function App({placesToStay}: AppProps): JSX.Element {
  return (
    <Main placesToStay = {placesToStay}/>
  );
}

export default App;
