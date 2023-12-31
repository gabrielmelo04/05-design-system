import type { StoryObj, Meta } from '@storybook/react';
import { Box, Text, TextArea, TextAreaProps } from '@gabriel-ignite-ui-new-02/react';

export default {
    title: 'Form/Text Area',
    component: TextArea,
    args: {},
    decorators: [
        (Story) => {
            return(
                <Box as="label" css={{ display: 'flex', flexDirection: 'column', gap: '$2' }}>
                    <Text size="sm">Observations</Text>
                    {Story()}
                </Box>
            )
        }
    ],
} as Meta<TextAreaProps>

export const Primary: StoryObj<TextAreaProps> = {
    args:{
        placeholder: 'Add any observations...'
    }
}

export const Disbaled: StoryObj<TextAreaProps> = {
    args: {
        disabled: true,
    }
}
