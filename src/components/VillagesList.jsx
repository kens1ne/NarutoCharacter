import React from 'react';
import axios from 'axios';

const VillagesList = (props) => {
    const handleCharacter = () => {
        const village = props.name.split(' ')[0];
        const getCharacters = async () => {
            const res = await axios.post('https://narutoql.up.railway.app/graphql', {
                query:
                    '{characters(filter: {village: "' +
                    village +
                    '"}) {info {count pages next prev} results {_id name avatarSrc description rank village}}}',
            });
            let { info, results: characters = [] } = res.data.data.characters;
            props.setCharacters(characters, info.next, village);
        };
        getCharacters();
    };
    return (
        <button className="p-1 text-[10px] bg-rose-600 rounded mx-2 my-1 text-white" onClick={handleCharacter}>
            {props.name}
        </button>
    );
};

export default VillagesList;
