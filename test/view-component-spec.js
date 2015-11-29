import React from 'react';
import expect from 'expect';
import {createRenderer} from 'react-addons-test-utils';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);
import ViewComponent from '../src/view-component'

describe('ViewComponent', () => {
  let renderer = createRenderer();

  it('propsに設定した文字列がそのまま出力される', () => {

    renderer.render(
      <ViewComponent text="test" />
    )

    let actualElement = renderer.getRenderOutput();

    let expectedElement = (
      <div className="viewComponent">
        test
      </div>
    );

    expect(actualElement).toEqualJSX(expectedElement);
  });

});
