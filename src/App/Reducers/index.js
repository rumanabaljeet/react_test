const reducer = (state = { data: '', action: '' }, action) => {
    switch (action.type) {
        case "LISTING":
            return { ...state, data: action.payload, action: "LISTING" }
        case "LISTING_ERROR":
            return { ...state, data:action.payload,action:"LISTING_ERROR" }
        case "GENRES":
            return { ...state, data: action.payload, action: "GENRES" }
        case "GENRES_ERROR":
            return { ...state, data:action.payload,action:"GENRES_ERROR" }
        case "MOVIE":
            return { ...state, data: action.payload, action: "MOVIE" }
        case "MOVIE_ERROR":
            return { ...state, data:action.payload,action:"MOVIE_ERROR" }
        case "SIMILAR_MOIVES":
            return { ...state, data: action.payload, action: "SIMILAR_MOIVES" }
        case "SIMILAR_MOVIE_ERROR":
            return { ...state, data:action.payload,action:"SIMILAR_MOVIE_ERROR" }

        default:
            return { ...state };
    }
}
export default reducer;