module.exports = {
    // added a getter method to display the date a cleaner format
     reformatDate: function(date) {
        const formatDate = new Date(date)
        return formatDate.toLocaleDateString()
    }
}