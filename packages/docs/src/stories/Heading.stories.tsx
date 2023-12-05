import type { StoryObj, Meta } from '@storybook/react';
import { Heading, HeadingProps } from '@ignite-ui/react';

export default {
    title: 'Typography/Heading',
    component: Heading,
    args: {
        size: 'md',
        children: 
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, ullam similique ducimus vitae sequi nemo nostrum, sit fugit architecto doloremque eum quos doloribus quis voluptates dolorem! Dignissimos facere reprehenderit dicta!',
     },
     argTypes:{
        size:{
            options: ['sm', 'md', 'lg', '2xl', '4xl', '5xl', '6xl'],
            control: {
                type: 'inline-radio'
            }
        },
     }
} as Meta<HeadingProps>

export const Primary: StoryObj<HeadingProps> = {}

export const CustomTag: StoryObj<HeadingProps> = {
    args: {
        children: 'H1 Heading',
        as: 'h1',
    },
    parameters: {
        docs: {
            description: {
                story: 'Por padrão Heading sempre será um `h2`, mas podemos alterar isso na propriedade `as`. '
            }
        }
    }
}
