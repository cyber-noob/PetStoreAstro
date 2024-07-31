export function get_today() {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    const date = yyyy + "-" + mm + "-" + dd;

    return date;
}

export function get_date(data) {
    var dd = String(data.date()).padStart(2, "0");
    var mm = String(data.month() + 1).padStart(2, "0");
    var yyyy = data.year();
    const date = yyyy + "-" + mm + "-" + dd;

    return date;
}