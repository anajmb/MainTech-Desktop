const coresAleatorias = [
    '#A0C4FF',
    '#ffddf4',
    '#FCBF6B',
    '#7EDDA9',
    '#BDB2FF',
    '#ffffcc',
    '#ccffff',
    '#FFCFD2',
    '#F7CBCA',
    '#BDCFAA'
];

export default function RandomColor() {
    return coresAleatorias[Math.floor(Math.random() * coresAleatorias.length)];
}   