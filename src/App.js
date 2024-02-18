import './App.css';
import Header from './components/Header';
import CustomTable from './components/CustomTable';
import MyCustomFilters from './MyCustomFilters';
const App = () => {
  return (
    <div className="App">
      <Header/>
      <MyCustomFilters/>
      <CustomTable/>
    </div>
  );
}

export default App;
