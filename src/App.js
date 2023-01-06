import Header from './components/Header';
import CharacterList from './components/CharactersList';
import { useEffect } from 'react';
const App = () => {
    useEffect(() => {
        document.title = 'Naruto Character';
    }, []);
    return (
        <div className="Naruto">
            <CharacterList />
        </div>
    );
};

export default App;
