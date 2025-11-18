import { useMemo } from 'react';

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
    '#BDCFAA',
    '#cfd3fcff',
    '#facffcff',
    '#cfe4fcff',
    '#cffcf8ff',
    '#fcf1cfff',
    '#fce1cfff',
    '#fccfcfff'
];

export default function RandomColor() {
    return useMemo(() => {
        return coresAleatorias[Math.floor(Math.random() * coresAleatorias.length)];
    }, []);
}