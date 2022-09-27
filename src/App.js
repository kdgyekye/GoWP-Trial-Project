import "./firebase.config";
import "./scss/styles.scss";

import Header from "./components/Header";
import Input from "./components/Input";
import List from "./components/List";

function App() {
  return (
    <div className="app-body">
      <div className="app-container">
        <Header />
        <Input />
        <List />
      </div>
    </div>
  );
}

export default App;
