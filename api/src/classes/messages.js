module.exports = {

    createError: (title, err) => {
        return {
            code: 'ERROR_API_INTERNAL',
            error: `${title}: ${err}`
        }
    },

    NO_ITEMS_RETURNED: {
        message: 'NO_ITEMS_RETURNED'
    }

}