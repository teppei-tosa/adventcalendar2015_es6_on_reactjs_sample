import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import expect from 'expect';
import {createRenderer} from 'react-addons-test-utils';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);
import SampleComponent from '../src/sample-component'
import ViewComponent from '../src/view-component'
import InputComponent from '../src/input-component'

describe('SampleComponent', () => {
  let renderer = createRenderer();

  it('子コンポーネントが正しく出力されることの確認', () => {

    renderer.render(
      <SampleComponent/>
    )

    let actualElement = renderer.getRenderOutput();

    let expectedElement = (
      <div className="sampleComponent">
        <InputComponent
          ref="iptCmp"
          placeholder="input something ..."
          inputChangeHandler={function noRefCheck() {}}
        />
        <ViewComponent
          ref="viewCmp"
          text="（ここにテキストボックスの値が入ります）"/>
      </div>
    );

    expect(actualElement).toEqualJSX(expectedElement);
  });

  it('state初期値が正しく設定されていることの確認', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <SampleComponent/>
    );

    expect(component.state.input_value).toBe('（ここにテキストボックスの値が入ります）');
  });

  it('テキストボックスに入力した値が正しくViewComponentに反映されることの確認', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <SampleComponent/>
    );

    const ipt = component.refs['iptCmp'].refs['ipt'];
    ReactTestUtils.Simulate.change(ipt, {target: {value: 'test'}});
    expect(component.state.input_value).toBe('test');
  });

});
