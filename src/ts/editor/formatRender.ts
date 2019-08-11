import {code160to32} from "../util/code160to32";
import {inputEvent} from "./inputEvent";
import {setSelectionByPosition} from "./setSelection";

export const formatRender = (vditor: IVditor, content: string, position?: { start: number, end: number },
                             triggerEvent: boolean = true) => {

    const textList = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\r\n");
    let html = "";
    const newLine = '<span><br><span style="display: none">\n</span></span>';
    textList.forEach((text, index) => {
        if (index === textList.length - 1 && text === "") {
            return;
        }
        if (text) {
            html += `<span>${code160to32(text.replace(/</g, "&lt;").replace(/ /g, "&nbsp;"))}</span>${newLine}`;
        } else {
            html += newLine;
        }
    });

    // TODO: 使用虚拟 Dom
    vditor.editor.element.innerHTML = html;

    if (position) {
        setSelectionByPosition(position.start, position.end, vditor.editor.element);
    }

    if (triggerEvent) {
        inputEvent(vditor);
    }
};
