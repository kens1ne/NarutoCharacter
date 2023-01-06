import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import Character from './Character';
import VillagesList from './VillagesList';

const CharacterList = () => {
    const [charactersData, setCharactersData] = useState([]);
    const [villagesData, setVillagesData] = useState([]);
    const [page, setPage] = useState(null);
    const [village, setVillage] = useState('');
    const [load, setLoad] = useState(false);

    useEffect(() => {
        const initialization = {
            getCharacters: async () => {
                const res = await axios.post('https://narutoql.up.railway.app/graphql', {
                    query: '{characters(filter: {}) {info {count pages next prev} results {_id name avatarSrc description rank village}}}',
                });
                let { info, results: characters = [] } = res.data.data.characters;
                setCharactersData(characters);
                setPage(info.next);
            },
            getVillages: async () => {
                const res = await axios.post('https://narutoql.up.railway.app/graphql', {
                    query: '{  villages {    results {      _id      name    }  }}',
                });
                let { results: villages = [] } = res.data.data.villages;
                setVillagesData(villages);
            },
            start: function () {
                this.getCharacters();
                this.getVillages();
            },
        };
        initialization.start();
    }, []);

    const setCharactersVillage = useCallback((data, page, village = null) => {
        setCharactersData(data);
        setPage(page);
        setVillage(village);
    }, []);
    const nextPage = async () => {
        setLoad(true);
        const res = await axios.post('https://narutoql.up.railway.app/graphql', {
            query:
                '{characters(filter: {village: "' +
                village +
                '"}, page: ' +
                page +
                ') {info {count pages next prev} results {_id name avatarSrc description rank village}}}',
        });
        let { info, results: characters = [] } = res.data.data.characters;
        setLoad(false);
        setPage(info.next);
        setCharactersData((p) => [...p, ...characters]);
    };

    const handleGetAll = async () => {
        const res = await axios.post('https://narutoql.up.railway.app/graphql', {
            query: '{characters(filter: {}) {info {count pages next prev} results {_id name avatarSrc description rank village}}}',
        });
        let { info, results: characters = [] } = res.data.data.characters;
        setCharactersData(characters);
        setPage(info.next);
        setVillage('');
    };

    return (
        <div className="max-w-7xl mx-auto my-4">
            <h1 className="title text-white text-center text-4xl font-bold uppercase">Naruto Characters</h1>
            <div className="village-button grid grid-cols-6">
                <button className="p-1 text-[10px] bg-rose-600 rounded mx-2 my-1 text-white" onClick={handleGetAll}>
                    All
                </button>
                {villagesData.map((village) => {
                    return (
                        <VillagesList
                            key={village._id}
                            id={village._id}
                            name={village.name}
                            setCharacters={setCharactersVillage}
                        />
                    );
                })}
            </div>
            <div className="flex-col justify-center px-4 mt-4">
                <div className={charactersData.length > 0 ? 'grid grid-cols-2 md:grid-cols-5 gap-4' : ''}>
                    {charactersData.length > 0 ? (
                        charactersData.map((character) => {
                            return (
                                <Character
                                    key={character._id}
                                    id={character._id}
                                    name={character.name}
                                    avatarSrc={character.avatarSrc}
                                    rank={character.rank}
                                    village={character.village}
                                />
                            );
                        })
                    ) : (
                        <h2 className="text-white text-center font-bold">Character Empty !</h2>
                    )}
                </div>
                <div className="load-more my-4 text-center">
                    {page ? (
                        <button className="title p-2 bg-red-700 rounded text-white" onClick={nextPage}>
                            {load ? 'Loading...' : 'Load More'}
                        </button>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
};

export default CharacterList;
