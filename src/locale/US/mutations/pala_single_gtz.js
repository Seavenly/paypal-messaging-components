import Logo from '../logos';
import { altContentMediaQuery } from './mediaQueries';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                logo: Logo.PRIMARY.COLOR,
                messageWidth: [textSize * 13, textSize * 18],
                headline: { tag: 'small', br: ['/mo'] },
                disclaimer: 'xsmall'
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [`.message__logo { width: ${textSize * 7}px }`],
                logo: Logo.ALT_NO_PP.COLOR,
                messageWidth: [textSize * 19, 1000]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                logo: false,
                messageWidth: [textSize * 17, 1000]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    altContentMediaQuery(textSize * 29.3),
                    `.message__logo-container { width: ${textSize * 9}px }`
                ],
                messageWidth: false,
                logo: Logo.ALTERNATIVE.COLOR
            })
        ],
        [
            'logo.type:alternative && logo.position:top',
            ({ textSize }) => ({
                styles: [`.message__logo-container { width: ${textSize * 9}px }`]
            })
        ],
        ['text.color:white && logo.type:primary', { logo: Logo.PRIMARY.WHITE }],
        ['text.color:white && logo.type:alternative', { logo: Logo.ALTERNATIVE.WHITE }],
        ['text.color:white && logo.type:inline', { logo: Logo.ALT_NO_PP.WHITE }]
    ],
    'layout:flex': [
        [
            'default',
            {
                logo: Logo.PRIMARY.WHITE,
                headline: { tag: 'small', br: ['of'] },
                disclaimer: 'xsmall'
            }
        ],
        [
            'ratio:1x4',
            {
                headline: { br: ['payments'] }
            }
        ],
        ['color:gray', { logo: Logo.PRIMARY.COLOR }],
        ['color:white', { logo: Logo.PRIMARY.COLOR }],
        ['color:white-no-border', { logo: Logo.PRIMARY.COLOR }]
    ],

    'layout:legacy': [
        [
            'default',
            {
                logo: Logo.PRIMARY.WHITE,
                headline: 'legacy-xsmall',
                subHeadline: 'legacy-large',
                disclaimer: 'legacy-medium'
            }
        ],
        ['size:1000x36', { logo: Logo.PRIMARY.COLOR }],
        ['size:120x90', { logo: false }],
        ['size:250x250', { disclaimer: 'legacy-medium.2' }],
        ['size:340x60', { disclaimer: 'legacy-medium.2' }],
        ['size:540x200', { styles: ['.message__messaging { padding-top: 45px; }'] }],
        ['size:170x100', { logo: false, headline: 'legacy-xsmall' }]
    ]
};
