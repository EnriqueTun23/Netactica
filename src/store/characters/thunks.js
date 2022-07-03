import { addUrl, addPeopleUrl, addListFilms, addCharacters, removeLoading, filterCharacters } from './';

export const addUrlCharacter = ( url ) => {
    return async(dispatch) => {
        dispatch(addUrl(url));
    }
}

export const addURLPeople = (url) => {
    return async(dispatch) => {
        dispatch(addPeopleUrl(url))
    }
}

export const saveFilms = (list) => {
    return async(dispatch) => {
        dispatch(addListFilms(list))
    }
}

export const loadData = (url) => {
    return async(dispatch, getState) => {
        const { characters } = getState().character;
        
        fetch(url).then((response) => response.json()).then((resp) => {
            if (resp.next !== null) {
                if (characters.length > 0) {
                    const newData = characters.concat(resp.results)
                    dispatch(addCharacters(newData))
                    dispatch(loadData(resp.next))

                } else {
                    dispatch(addCharacters(resp.results))
                    dispatch(loadData(resp.next))
                }
            } else {
                const newData = characters.concat(resp.results)
                dispatch(addCharacters(newData))
                dispatch(removeLoading())
            }
        })
    }
}

export const filter = (filters) => {
    return (dispatch, getState) => {
        const { backupCharacter } = getState().character;

        const eye_color = filters.eye_color ? backupCharacter.filter(item => item.eye_color.toUpperCase() === filters.eye_color.toUpperCase() ) : []
        const films = filters.films ? [] : [];
        const gender = filters.gender ? backupCharacter.filter(item => item.gender.toUpperCase() === filters.gender.toUpperCase()) : [];
        
        const res_concat = eye_color.concat(films, gender)
        
        const parse_concat = new Set(res_concat)

        let newData = [...parse_concat];

        dispatch(filterCharacters(newData))

    }
}