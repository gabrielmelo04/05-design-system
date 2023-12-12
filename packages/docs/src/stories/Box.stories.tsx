import type { StoryObj, Meta } from '@storybook/react';
import { Box, BoxProps } from '@gabriel-ignite-ui-new-02/react';

export default {
    title: 'Surfaces/Box',
    component: Box,
    args: {
        children:(
            <>
                <span>Testando o elemento Box</span>
            </>
        )
     },
     argTypes:{
        children: {
            control: {
                type: null,
            }
        }
     }
} as Meta<BoxProps>

export const Primary: StoryObj<BoxProps> = {
    /*args: { //São Propriedades
        children: 'Enviar',
    }*/
}
