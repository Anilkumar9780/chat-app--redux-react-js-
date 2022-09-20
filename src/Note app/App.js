import "./css/App.css";
import Notes from "./NoteComponents/Notes";
import Header from "./NoteComponents/Header";
function App() {
  return (
    <div className="main">
      <Header />
      <Notes />
    </div>
  );
}
export default App;
