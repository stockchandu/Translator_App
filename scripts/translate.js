function copy_text() {

    let second_input = document.getElementById("translate_output");
    second_input.select();
    second_input.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(second_input.value);
    document.getElementById("text_alert").innerHTML = "Copied"


}
function remove() {

    let first_input = document.getElementById("a_value");
    first_input.value = null;
    let second_input = document.getElementById("translate_output");
    second_input.value = null;
    document.getElementById("text_alert").innerHTML = "Copy text"
}


function toggle() {
    let from = document.getElementById("from_value")
    let to = document.getElementById("to_value")

    let temp = from.selectedIndex;
    from.selectedIndex = to.selectedIndex;
    to.selectedIndex = temp;
}

async function trans(input, from, to) {
    const res = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        body: JSON.stringify({
            q: input,
            source: from,
            target: to,
        }),
        headers: { "Content-Type": "application/json" }
    });

    let get_result = await res.json();

    return get_result;


}

async function show_data() {

    let input_1 = document.getElementById("a_value").value

    let input_2 = document.getElementById("from_value").value
    let input_3 = document.getElementById("to_value").value

    let data_value = await trans(input_1, input_2, input_3)

    let { translatedText } = data_value;
    document.getElementById("translate_output").value = translatedText;

    if(input_1===""){
        document.getElementById("translate_output").value=null
    }

}

let time;
let debounce = (show, delay) => {


    if (time) {
        clearTimeout(time);
    }

    time = setTimeout(() => {

        show()
    }, delay)

}