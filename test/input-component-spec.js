import React from 'react';
import expect from 'expect';
import {createRenderer} from 'react-addons-test-utils';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);
import InputComponent from '../src/input-component'

describe('InputComponent', () => {
  let renderer = createRenderer();

  it('propsに設定した値が正しく反映されてDOM出力されることの確認', () => {

    renderer.render(
      <InputComponent
        placeholder="test placeholder text"
        inputChangeHandler={function noRefCheck() {}}
      />
    )

    let actualElement = renderer.getRenderOutput();

    let expectedElement = (
      <div className="inputComponent">
        <input
          type="text"
          ref="ipt"
          placeholder="test placeholder text"
          onChange={function noRefCheck(){}}
        />
      </div>
    );

    expect(actualElement).toEqualJSX(expectedElement);
  });

});
