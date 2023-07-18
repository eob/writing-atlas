import Mark from '../../components/markable/mark'
import Markable from '../../components/markable/markable'
import Link from "next/link"


export default function Automark({word, words, regex, children, withLink, withLinkFn}) {
    if (!regex && word) {
        regex = new RegExp(`(\\s|^)${word}(\\s|$)`, 'g')
    }
    if (!regex && words) {
        let options = words.join('|')
        regex = new RegExp(`(\s|^)${options}(\\s|$)`, 'g')
    }
    if (!children) {
        return null;
    }

    const matches = children.matchAll(regex);        
    let newKids = []
    let ptr = 0;
    for (const match of matches) {
        if (match.length < 3) {
            continue;
        }

        let m = match[2]
        let length = m.length;
        let index = match.index;
        let text = `${m}`

        if (!((m != null) && text && (text.length > 1))) {
            continue
        }

        let lPad = `${match[0]}`.indexOf(text);
        let rPad = `${match[0]}`.length - lPad - text.length;
        
        if (index > 0) {
            newKids.push(
                <span>{children.substring(ptr, index+lPad)}</span>
            )
        }
        if (withLink || withLinkFn) {
            let link = null;
            if (withLink) {
                link = withLink
            } else {
                link = withLinkFn(text)
            }

            newKids.push(
                <Link href={link}>
                    <a className="underline text-black bg-indigo-100">{text}</a>
                </Link>
            )        
        } else {
            newKids.push(
                <Mark>{text}</Mark>
            )    
        }
        ptr = index+length+lPad-rPad+1
    }
    newKids.push(
        <span>{children.substring(ptr, children.length)}</span>
    )

    if (withLink || withLinkFn) {
        return newKids
    } else {
    return (
        <Markable>
            {newKids}
        </Markable>
    )
    }

}