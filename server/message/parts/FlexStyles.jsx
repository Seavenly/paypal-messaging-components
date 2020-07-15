/** @jsx h */
import { h } from 'preact';

const ratioMap = {
    '1x1': [
        {
            ratio: '1x1',
            width: [120, 300]
        }
    ],
    '1x4': [
        {
            ratio: '1x2',
            width: [160, 160]
        },
        {
            ratio: '1x4',
            breakpoint: 768
        }
    ],
    '8x1': [
        {
            ratio: '6x1',
            width: [250, 768]
        },
        {
            ratio: '8x1',
            breakpoint: 768
        }
    ],
    '20x1': [
        {
            ratio: '6x1',
            width: [250, 768]
        },
        {
            ratio: '20x1',
            width: [350, 1169],
            breakpoint: 768
        }
    ]
};

function toCSSValue(value) {
    if (typeof value === 'number') {
        return `${value}px`;
    }

    if (typeof value === 'string') {
        const match = value.match(/^(\d+)x(\d+)$/);

        if (match) {
            return `${match.slice(1).reduce((denominator, numerator) => +numerator / +denominator) * 100}%`;
        }
    }

    return value;
}

function ratioStringToObject(value) {
    // Matches the following example: 1x4@500px[300px,700px]
    // All parts are optional except for the ratio
    // ratio - 1x4
    // breakpoint - 500px
    // min-width - 300px
    // max-width: 700px
    const [ratio, ...optionalRules] = value.split(/(?=[@[])/);

    if (!ratio.match(/\d+x\d+/)) return {};

    // TODO: Should we validate these values?
    const ratioObject = optionalRules.reduce(
        (accumulator, rule) => {
            if (rule.startsWith('@')) {
                accumulator.breakpoint = rule.slice(1);
            } else if (rule.startsWith('[')) {
                accumulator.width = rule.slice(1, -1).split(',');
            }

            return accumulator;
        },
        { ratio }
    );

    return ratioObject;
}

const FlexStyles = ({ ratio: ratioPreset, layout }) => {
    let ratioConfig = [];
    if (layout === 'flex') {
        ratioConfig = ratioMap[ratioPreset];
    } else if (Array.isArray(ratioPreset)) {
        ratioConfig = ratioPreset.map(ratioStringToObject);
    } else if (typeof ratioPreset === 'string') {
        ratioConfig = [ratioStringToObject(ratioPreset)];
    }

    return (
        <style>
            {ratioConfig.reduce((accumulator, { breakpoint, ratio, width }) => {
                if (accumulator === '') {
                    return `
                        button {
                            display: block;
                            width: 100%;
                            ${
                                Array.isArray(width)
                                    ? `
                                        min-width: ${toCSSValue(width[0])};
                                        max-width: ${toCSSValue(width[1])};`
                                    : ``
                            }
                            box-sizing: border-box;
                            position: relative;
                        }

                        button::before {
                            padding-top: ${toCSSValue(ratio)};
                            content: '';
                            display: block;
                        }
                    `;
                }

                if (!breakpoint) return accumulator;

                return `
                    ${accumulator}
                    @media (min-width: ${toCSSValue(breakpoint)}) {
                        ${
                            Array.isArray(width)
                                ? `
                                    button {
                                        min-width: ${toCSSValue(width[0])};
                                        max-width: ${toCSSValue(width[1])};
                                    }`
                                : ``
                        }
                        button::before {
                            padding-top: ${toCSSValue(ratio)};
                        }
                    }
                `;
            }, '')}
        </style>
    );
};

export default FlexStyles;
