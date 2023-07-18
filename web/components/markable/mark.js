const PINK = '#FBB6CE'
const PURPLE = '#D6BCFA'
const INDIGO = '#A3BFFA'
const BLUE = '#90CDF4'
const TEAL = '#81E6D9'
const YELLOW = '#FAF089'
const ORANGE = '#FBD38D'
const RED = '#FEB2B2'
const GRAY = '#E2E8F0'
import { annotate } from 'rough-notation';
import { useRef } from 'react'

function pinkMark({children}) {
    let bgcolor = PINK
    return (
        <React.Fragment>
            <style jsx>{`
                .mark {
                    display: inline;
                    color: #000; 
                    padding: 0.25em;
                    background-color: ${bgcolor};
                }

                .mark {
                    position: relative;
                    left: 0.25em;
                    padding-left: 0;
                    box-shadow: 20px 0 0 ${bgcolor},  
                    20px*-1 0 0 ${bgcolor};                        
                }
            `}</style>    
            <span className="mark">
                {children}
            </span>
        </React.Fragment>
    )
}

function animatedMark({children}) {
    // https://roughnotation.com/
    let ref = null;

    const setRef = (_ref) => {
        if ((ref == null) || (ref != _ref)) {
            ref = _ref
            const annotation = annotate(ref, { type: 'highlight', color: PINK });
            annotation.show();
        }
    }

    return (
        <React.Fragment>
            <span ref={setRef}>{children}</span>
        </React.Fragment>
    )
}

export default function Mark({children}) {
    return animatedMark({children})
} 