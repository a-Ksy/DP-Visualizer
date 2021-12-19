import "./App.css";
import Container from "./components/Container/Container";
import Dashboard from "./components/Dashboard/Dashboard";
import Loading from "./components/Loading/Loading";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Loading />
      <Container>
        <Navbar />
        <Dashboard />
      </Container>
    </div>
  );
}

export default App;
