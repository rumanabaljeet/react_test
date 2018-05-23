const reducer = (state = { data: '', action: '' }, action) => {
    switch (action.type) {
        case "LISTING":
            return { ...state, data: action.payload, action: "LISTING" }
        case "LISTING_ERROR":
            return { ...state, data:action.payload,action:"LISTING_ERROR" }
        default:
            return { ...state };
    }
}
export default reducer;