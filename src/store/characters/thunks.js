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

        let characters = backupCharacter

        if (filters.eye_color) {
            characters = characters.filter(item => item.eye_color.toUpperCase() === filters.eye_color.toUpperCase())
        }

        if (filters.gender) {
            characters = characters.filter(item => item.gender.toUpperCase() === filters.gender.toUpperCase())
        }

        if (filters.films) {
            characters = characters.filter((value, index) => {
               const search = value.films.find((data) => data.toUpperCase() === filters.films.toUpperCase())

               return search !== undefined;
            })
        }

        dispatch(filterCharacters(characters))

    }
}