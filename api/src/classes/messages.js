module.exports = {

    createError: (title, err) => {
        return {
            error: `api ${title}: ${err}`
        }
    },

    NO_ITEMS_RETURNED: {
        message: 'No items returned.'
    }

}