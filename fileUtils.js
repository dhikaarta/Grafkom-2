// function to save the canvas state
const save_state = (state_variable) => {
    const jsonString = JSON.stringify(state_variable);
    const blob = new Blob([jsonString], {type: 'application/json'});
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.download = 'canvas_state.json';
    link.href = url;
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
};

const load_state = (file_input) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file_input);
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = () => {
          reject(reader.error);
        };
    });
};
