# Components

- [ ] Text
- [ ] Heading
- [ ] Box
- [ ] Button
- [ ] TextInput
- [ ] TextArea
- [ ] Checkbox
- [ ] Avatar
- [ ] MultiStep

-> Criar uma pasta packages
-> Dentro da pasta packages criar uma pasta tokens
-> Dentro da pasta token -> npm init -y
-> Dentro da pasta tokens criar uma pasta src
-> Dentro da pasta src -> criar o arquivo colors.ts
-> Dentro da pasta src -> criar o arquivo index.ts

-> Dentro da pasta tokens: 
    -> npm i -D typescript 
    -> Depois rodar o npx tsc --init ( para criar um arquivo tsconfig.json)
    -> Instalar o pacote: npm i tsup -D (Ferramente para fazer o processo de conversão em um pacote js que poderá ser carregado em outras plataformas)

-> No package.json:
    "scripts": {
        "build": "tsup src/index.ts --format esm,cjs --dts", // -> formatar em esm e cjs (javascript) e exportar as definições de tipagem (--dts)
        "dev": "tsup src/index.ts --format esm,cjs --dts --watch" // -> monitorando quaqluyer alteração e fazer o processo de build automaticamente
    },

    -> executar: npm run build  ou npm run dev

-> Monorepo:
    -> Criar uma pasta na pasta packages -> react
    -> Na pasta react :
        -> npm init -y
        -> npm i typescript -D
        -> npm i tsup -D
        -> Ir no package.json da pasta react -> mudar o nome para "@ignite-ui/react"
        -> Ir no package.json da pasta react, colocar:
            "scripts": {
                "build": "tsup src/index.ts --format esm,cjs --dts", // -> formatar em esm e cjs (javascript) e exportar as definições de tipagem (--dts)
                "dev": "tsup src/index.ts --format esm,cjs --dts --watch" // -> monitorando quaqluyer alteração e fazer o processo de build automaticamente
            },
        -> Criar a pasta src
        -> Dentro da pasta src -> Criar o arquivo index.ts
        -> npm run build

    -> Voltar na pasta raiz -> .../05-design-system
        -> npm init -y
        -> package.json Global:
            - Apagar tudo
            - Escrever:
            {
                "private": true, /*O pacote não vai ser publicado no npm */
                "workspaces":[ /* Pegar todas as patas da pasta packages
                    "packages/*"
                ]
            }
        -> Agora ir na pasta tokens, deletar o node_modules
        -> Agora ir na pasta react, deletar o node_modules
        -> Agora ir na pasta react -> package.json -> nas dependencias acrescentar: "@ignite-ui/tokens": "*",
        -> Na pasta raiz do projeto .../05-design-system -> npm i

        -> Para que a gente consiga fazer as importações que estão na pasta tokens, precisamos fazer isso:
            -> Na pasta tokens -> No package.json  e fazer tambem na pasta react -> No package.json :
                -> "main": "./dist/index.js",
                -> "module": "./dist/index.mjs",
                -> "types": "./dist/index.d.ts",
            -> Na pasta raiz do projeto -> npm i
            -> Ir na pasta tokens:
                -> npm run build
                -> Com isso no react -> consigo importar as coisas da pasta tokens:
                    -> Ir na pasta react -> src -> index.ts:
                        -> import { colors } from '@ignite-ui/tokens';

                            console.log(colors);
    
    -> Configurar typscript para que seja compartilhado em varios pacotes:
        -> Dentro na pasta packages, criar uma pasta ts-config
        -> Nessa nova pasta, npm init -y
        -> No package.json da pasta ts-config, mudar o nome para: "name": "@ignite-ui/ts-config", e mudar as liçensas para MIT, "private": true
        -> Criar um arquivo base.json:
            {
                "compilerOptions": {
                    "composite": false,
                    "declaration": true,
                    "declarationMap": true,
                    "esModuleInterop": true,
                    "forceConsistentCasingInFileNames": true,
                    "inlineSources": false,
                    "isolatedModules": true,
                    "moduleResolution": "node",
                    "noUnusedLocals": false,
                    "noUnusedParameters": false,
                    "preserveWatchOutput": true,
                    "skipLibCheck": true,
                    "strict": true
                },
                "exclude": ["node_modules"]
            }
        -> Criar um arquivo react.json:
            {
                "extends": "./base.json",
                "compilerOptions": {
                    "jsx": "react-jsx",
                    "lib": ["dom", "ES2015"],
                    "module": "ESNext",
                    "target": "es6"
                }
            }
        -> Agora na pasta tokens, no packages.json:
            -> devDependencies: {
                "@ignite-ui/ts-config": "*"
            }
        -> Agora na pasta react, no packages.json:
            -> devDependencies: {
                "@ignite-ui/ts-config": "*"
            }
        
        ->Volta na raiz do projeto e execute o comando:
            npm i

        -> Dentro da pasta tokens -> tsconfig.json - apagar tudo e escrever:
            {
                "extends": "@ignite-ui/ts-config/base.json",
                "include": ["src"]
            }

        ->  Dentro da pasta react -> tsconfig.json- apagar tudo e escrever:
            {
                "extends": "@ignite-ui/ts-config/react.json",
                "include": ["src"]
            }
    
    -> Ir na pasta tokens:
        npm run build

    -> Ir na pasta react:
        npm run build

    -> Ir na pasta react:
        npm i -D react @types/react @types/react-dom

        -> Ir no package.json:
            colocar: "build": "tsup src/index.ts --format esm,cjs --dts --external react",
            Para dizer ao tsup que quando fizer a build ele não precisa se preocupar com a importação do react, pois o react é uma importação externa (de alguem que já está usando)

            Agora podemos criar um componente em react para testar:
             src -> index.tsx =
                    import { colors } from '@ignite-ui/tokens';

                    export function App(){
                        return(
                            <h1 style={{ color: colors.ignite300 }}>Hello World</h1>
                        )
                    }
            executar no cmd do react: npm run build


    -> Configurar Stitches:
        - Na pasta react:
            npm i @stitches/react

        - Na pasta react - src crair a pasta styles:
            criar index.ts:
                import { colors, fontSizes, fontWeights, fonts, lineHeights, radii, space } from "@ignite-ui/tokens";
                import { createStitches, defaultThemeMap } from "@stitches/react";

                export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } = createStitches({

                    themeMap: {
                        ...defaultThemeMap,
                        height: 'space', //quero que utilize em height o token space
                        width: 'space',
                    },

                    theme: {
                        colors: colors,
                        fontSizes: fontSizes,
                        fontWeights: fontWeights,
                        fonts: fonts,
                        lineHeights: lineHeights,
                        radii: radii,
                        space: space
                    } //variáveis que vou utilizar dentro do thema
                });

        - Na pasta react - index.tsx:
            import { styled } from './styles';

            //console.log(colors);

            import { styled } from './styles';

            //console.log(colors);

            export const Button = styled('button', {
                fontFamily: '$default',
                backgroundColor: '$ignite500',
                borderRadius: '$md',
                padding: '$4',
                border: 0,
                //height: '$10'
            });

        -> Storybook - Permite documentar componentes do front-end
            -> No packages criar a pasta docs
            -> Na pasta docks:
                npx sb init --builder @storybook/builder-vite --type react --use-npm
            
            -> Se der erro ao executar o comando lá em cima, fazer:
                1. Apague a pasta `packages/docs` caso exista
                2. Execute o comando `npm create vite@latest docs` dentro da pasta `packages` para iniciar um projeto Vite onde o nome da pasta será `docs`.
                3. Escolha as opções `React` e `Typescript` na configuração do Vite e aguarde a finalização da instalação
                4. Com a instalação finalizada, acessa a pasta `packages/docs` e execute o comando `npx storybook@latest init --package-manager npm`
                5. Será perguntado se você deseja instalar o plugin do ESLint, essa instalação é opcional e fica a seu critério.
                6. Com a configuração do Storybook finalizada, deve abrir uma janela para você de boas vindas
                7. Acesso o arquivo packages/docs/package.json e edite os comandos de build para que o npm run build execute o build do Storybook, não do Vite. Exemplo:
                    "build-vite": "tsc && vite build",
                    "build": "storybook build",

            -> Ir em docs -> src -> deletar a pasta stories
                . Criar a pasta storie -> Criar o primira documentação: Button.stories.tsx

            -> No package.json do docs:
                "dependencies": {
                    "@ignite-ui/react": "*",
                    "@ignite-ui/tokens": "*",
                    "react": "^18.2.0",
                    "react-dom": "^18.2.0"
                },
            -> No cmd docs -> npm i
            -> No cmd react -> npm run dev

            ->No arquivo Button.stories.tsx:
                import { Button } from '@ignite-ui/react';
                import type { StoryObj, Meta } from '@storybook/react';

                export default {
                    title: 'Button',
                    component: Button,
                } as Meta

                export const Primary: StoryObj = {
                    
                }

            -> Para Acessar o StoryBook -> na pasta docs -> npm run storybook

            ->Dentro da pasta .storybook:

                -> Criar o arquivo manager.js
                    import { addons } from '@storybook/manager-api'
                    import { themes } from '@storybook/theming'

                    addons.setConfig({
                        theme: themes.dark
                    });

                    rodar novamente o npm run storybook

            -> Adicionar Formato de Letra:
                -> Ir na pasta .storybook
                -> Criar o arquivo  preview-head.html e adicionar:
                    Roboto:
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
            
            -> No docs -> .storybook  -> preview.ts:
                Acrescnetar:
                    - import { themes } from '@storybook/theming'
                    backgrounds: {
                        default: 'dark'
                    },
                    docs: {
                        theme: themes.dark,
                    }

            -> Documantar nossos Tokens ( tokens de cores, tokens de espaçamentos ....):

                -> Criar uma pasta Tokens dentro de pages
                -> Dentro da pasta Tokens:
                    . Criar o arquivo colors.stories.mdx
                    . Dentro do arquivo colors.stories.mdx:
                        import { Meta } from '@storybook/addon-docs'
                        import { ColorsGrid } from '../../ColorsGrid'

                        <Meta title="Tokens/Colors" />

                        # Colors

                        Essas são as cores utilizadas no ignite UI.

                        <ColorsGrid />


                -> Dentro do src do Docs -> components -> Criar o arquivo ColorsGrid.tsx:
                    import { colors } from '@ignite-ui/tokens';
                    import { getContrast } from 'polished';

                    export function ColorsGrid(){
                        return Object.entries(colors).map(([ key, color ]) => {
                            return (
                                <div key={key} style={{ backgroundColor: color, padding: '2rem'}}>
                                    <div style={{
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        fontFamily: 'monospace', 
                                        color: getContrast(color, '#FFF') < 3.5 ? '#000' : '#FFF' }}
                                    >
                                        <strong>${key}</strong>
                                        <span>{color}</span>
                                    </div>
                                </div>
                            )
                        }) /* entries - percorre todas as cores */
                    }
                . Para que as cores que foram colocadas no storyBook ( cores claras fiquem escuras - contraste):
                    -> acessar a raiz docs
                        npm i polished

                -> Dentro do Components -> Criar o arquivo TokensGrid.tsx:
                    import '../styles/tokens-grid.css'

                    interface TokensGridsProps {
                        tokens: Record<string, string>
                        hasRemValue?: boolean
                    }

                    export function TokensGrid({ tokens, hasRemValue = false }: TokensGridsProps){
                        return(
                            <table className='tokens-grid'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Value</th>
                                        {hasRemValue && <th>Pixels</th>}
                                    </tr>
                                </thead>

                                <tbody>
                                    {Object.entries(tokens).map(([key, value]) => {
                                        return(
                                            <tr key={key}>
                                                <td>{key}</td>
                                                <td>{value}</td>
                                                {hasRemValue && (
                                                    <td>{Number(value.replace('rem', '')) * 16} px</td>
                                                )}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        )
                    }

                    -> Criar o arquivo dentro da pasta tokens:
                        import { Meta } from '@storybook/addon-docs'
                        import { TokensGrid } from '../../components/TokensGrid'
                        import { space } from '@ignite-ui/tokens'

                        <Meta title="Tokens/Space" />

                        # Space

                        <TokensGrid tokens={space} hasRemValue />

                    ->Configurando o TurboRepo - Ajuda acelerar o processo de build ( guarda um cache local )
                        . Precisa estar configurado com o Git
                         . Na raiz do projeto -> git init
                         . Criar o .gitignore
                        
                        . Instalar o TurboRepo, na raiz do projeto:
                            . npm i turbo@latest -D
                            . na raiz -> criar o arquivo turbo.json:
                                {
                                    "$schema": "https://turborepo.org/schema.json",
                                    "pipeline": {
                                        "dev": {
                                            "cache": false
                                        }
                                    }
                                }
                            
                            . no package.json da raiz:
                                 "scripts": {
                                    "dev": "turbo run dev --parallel",
                                    "build": "turbo run build"
                                },
                            
                            . Rodar na raiz: npm run dev   -> Só com ele vai rodar tudo até o storybook
                            . Rodar na raiz: npm run build

                    
                    -> Criando o Componente Box:
                        . Na pasta React -> src -> criar a pasta components: criar o arquivo Box.tsx:
                            import { ComponentProps } from "react";
                            import { styled } from "../styles";


                            export const Box = styled('div', {
                                padding: '$4',
                                borderRadius: '$md',
                                backgroundColor: '$gray600',
                                border: '1px solid $gray600',
                            })

                            export interface BoxProps extends ComponentProps<typeof Box> {}

                        .Dentro da pasta docs -> stories -> criar: Box.stories.tsx:
                            import type { StoryObj, Meta } from '@storybook/react';
                            import { Box, BoxProps } from '@ignite-ui/react';

                            export default {
                                title: 'Surfaces/Box',
                                component: Box,
                                args: {
                                    children:(
                                        <>
                                            <span>Testando o elemento Box</span>
                                        </>
                                    )
                                }
                            } as Meta<BoxProps>

                            export const Primary: StoryObj<BoxProps> = {
                                /*args: { //São Propriedades
                                    children: 'Enviar',
                                }*/
                            }

                        .Dentro da pasta React -> src -> index.tsx:
                            packages/react/src/index.tsx


                    -> Css:
                     . No pacote react instalar o npm install @radix-ui/react-avatar
                     . Dentro do components, criar a pasta Avatar ( index.tsx e styles.ts)
                        .styles.ts:
                            import * as Avatar from '@radix-ui/react-avatar';
                            import { styled } from "../../styles";

                            export const AvatarContainer = styled(Avatar.Root,{

                                borderRadius: '$full',
                                display: 'inline-block',
                                width: '$12',
                                height: '$12',
                                overflow: 'hidden',

                            })

                            export const AvatarImage = styled(Avatar.Image, {
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: 'inherit',
                            });

                            export const AvatarFallback = styled(Avatar.Fallback, {
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '$gray600',
                                color: '$gray800',

                                svg:{
                                    width: '$6',
                                    height: '$6',
                                }
                            })

                -> Ir na raiz packages:
                    npm i phosphor-react

                ->Componente CheckBox:
                    . usar o radix-ui.com
                    . ir na raiz do react
                        . npm install @radix-ui/react-checkbox

                -> biblioteca de acessibiliade:
                    .Acessar packages/docs:
                        addon storybook a11y
                        npm install @storybook/addon-a11y
                    .Acessar packages/docs/main.ts:
                        adcionar:
                            export default {
                                getAbsolutePath('@storybook/addon-a11y'),
                            };


# Storybook Deploy
https://github.com/storybook-eol/storybook-deployer

. Acessar Packages -> Docs
npm i @storybook/storybook-deployer --save-dev

.Dentro da pasta docs:
    . Em package.json, adicionar nos scripts:
        "deploy-storybook": "storybook-to-ghpages"

. Criar um repositório github
    git init
    git branch -M main
    git remote add origin ...
    git pull origin main --allow-unrelated-histories
    git add .
    git commit -m "feat: Add core components" 
    git push origin main

    -> No meu repositorio -> settings -> actions -> general -> mudar o workflow permisson para Read and write permission

    -> Depois que rodar as actions, ir para o Settings, pages:
        Deploy from a branch
        gh-pages   /root   e salvar

# Rodar o Storybook
-> cd packages
-> cd docs
npm run storybook