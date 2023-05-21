import logo from './logo.svg';
import { useState } from 'react';
import * as React from 'react';
import './App.css';
import { Text, Stack, PrimaryButton, IStackTokens, Pivot, PivotItem, List, Label, AutoScroll, TextField, DefaultButton, Separator, Slider, Image } from '@fluentui/react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { hiddenContentStyle, mergeStyles } from '@fluentui/react/lib/Styling';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { ThemeProvider, PartialTheme  } from '@fluentui/react/lib/Theme';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from '@fluentui/react/lib/Styling';


function MyButton() {
  return (
    <PrimaryButton>123</PrimaryButton>
  );
}

function MyButtonProp({ text }) {
  return (
    <PrimaryButton>{text}</PrimaryButton>
  );
}

function MyButtonState({ text }) {
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex(index + 1);
  }

  return (
    <DefaultButton onClick={handleClick}>{text} {index}</DefaultButton>
  );
}

const containerStackTokens: IStackTokens = { childrenGap: 5 };

const dialogContentProps = {
  type: DialogType.normal,
  title: 'Hello',
  closeButtonAriaLabel: 'Close',
  subText: ''
};
const dialogStyles = { main: { maxWidth: 450 } };
const dragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
  keepInBounds: true,
};
const screenReaderOnly = mergeStyles(hiddenContentStyle);

const theme: ITheme = getTheme();
const { palette, semanticColors, fonts } = theme;

const classNames = mergeStyleSets({
  itemCell: [
    getFocusStyle(theme, { inset: -1 }),
    {
      minHeight: 54,
      padding: 10,
      boxSizing: 'border-box',
      borderBottom: `1px solid ${semanticColors.bodyDivider}`,
      display: 'flex',
      selectors: {
        '&:hover': { background: palette.neutralLight },
      },
    },
  ],
});

function App() {

  const [field1, setField1] = useState("风带来了故事的种子，时间使之发芽。");
  const [imagewidth, setImagewidth] = useState(64);
  const [items, setItems] = React.useState([]);
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
  const labelId: string = useId('dialogLabel');
  const subTextId: string = useId('subTextLabel');

  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: dialogStyles,
      dragOptions: isDraggable ? dragOptions : undefined,
    }),
    [isDraggable, labelId, subTextId],);

  function onTextFieldChanged(e) {
    console.log(field1);
    setField1(e.target.value);
  }

  return (
    <>
      <ThemeProvider>
        <div className="App">
          <Stack className='Content' tokens={containerStackTokens}>
            <Text >HelloReact</Text>
            <Stack.Item align="start">
              <MyButton />
            </Stack.Item>
            <Stack.Item align="start">
              <MyButtonProp text="hello"></MyButtonProp>
            </Stack.Item>
            <Stack.Item align="start">
              <MyButtonState text="hello" ></MyButtonState>
            </Stack.Item>

            <Pivot aria-label="Basic Pivot Example">
              <PivotItem headerText="Text">
                <Stack tokens={containerStackTokens}>
                  <Label>是你吧 撕下一缕霓裳 借我照亮 盒中之花</Label>
                  {/* <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" title='cloudmusic player' width={520} height={86} src="//music.163.com/outchain/player?type=2&id=2014336709&auto=0&height=66"></iframe> */}
                </Stack>
              </PivotItem>
              <PivotItem headerText="List">
                <Stack tokens={containerStackTokens}>
                  <TextField label='Add item' onKeyDown={(e) => {
                    console.log(e);
                    if (e.key === "Enter") {
                      setItems(
                        [...items, ...[e.target.value]]
                      );
                      e.target.value = "";
                    }
                  }}></TextField>
                  <List items={items} onRenderCell={(item, index) => {
                    return(
                      <div className={classNames.itemCell} data-is-focusable={true}>
                        <Label data-is-focusable={true}>{item}</Label>
                      </div>
                    );
                  }} />
                </Stack>
              </PivotItem>
              <PivotItem headerText="Inputs">
                <Stack tokens={containerStackTokens}>
                  <TextField label="Enter something..." onChange={onTextFieldChanged} value={field1} />
                  <Label>{field1}</Label>
                  <Stack.Item align='start'>
                    <PrimaryButton onClick={toggleHideDialog}>Show dialog</PrimaryButton>
                  </Stack.Item>
                  <Separator />
                  <Slider label="Image width" min={1} max={144} defaultValue={64} showValue value={imagewidth} onChange={(e) => {
                    setImagewidth(e);
                  }} />
                  <Image src='https://bbs-static.miyoushe.com/static/2023/05/05/c3e597319e24a16e94f7becb92e4d4a3_515942399388695619.png' width={imagewidth}></Image>
                </Stack>
              </PivotItem>
            </Pivot>
          </Stack>
        </div>
        <Dialog
          hidden={hideDialog}
          onDismiss={toggleHideDialog}
          dialogContentProps={dialogContentProps}
          modalProps={modalProps}
        >
          {field1}
          <DialogFooter>
            <PrimaryButton onClick={toggleHideDialog} text="OK" />
          </DialogFooter>
        </Dialog>
      </ThemeProvider>
    </>

  );
}

export default App;
