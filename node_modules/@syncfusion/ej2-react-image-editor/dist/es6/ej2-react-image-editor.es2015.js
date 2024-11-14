import { createElement, Component } from 'react';
import { ImageEditor } from '@syncfusion/ej2-image-editor';
export * from '@syncfusion/ej2-image-editor';
import { applyMixins, ComponentBase } from '@syncfusion/ej2-react-base';

/**
 * Represents the React ImageEditor Component
 * ```html
 * <ImageEditorComponent></ImageEditorComponent>
 * ```
 */
class ImageEditorComponent extends ImageEditor {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = false;
        this.statelessTemplateProps = null;
        this.templateProps = null;
        this.immediateRender = false;
        this.isReactMock = true;
        this.portals = [];
    }
    render() {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            super.render();
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    }
}
applyMixins(ImageEditorComponent, [ComponentBase, Component]);

export { ImageEditorComponent };
//# sourceMappingURL=ej2-react-image-editor.es2015.js.map
