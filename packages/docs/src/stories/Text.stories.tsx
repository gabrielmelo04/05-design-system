import type { StoryObj, Meta } from '@storybook/react';
import { Text, TextProps } from '@gabriel-ignite-ui-new-02/react';

export default {
    title: 'Typography/Text',
    component: Text,
    args: {
        size: 'md',
        children: 
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, ullam similique ducimus vitae sequi nemo nostrum, sit fugit architecto doloremque eum quos doloribus quis voluptates dolorem! Dignissimos facere reprehenderit dicta!',
     },
     argTypes:{
        size:{
            options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'],
            control: {
                type: 'inline-radio'
            }
        },
     }
} as Meta<TextProps>

export const Primary: StoryObj<TextProps> = {}

export const CustomTag: StoryObj<TextProps> = {
    args: {
        children: 'Strong text',
        as: 'strong',
    }
}
