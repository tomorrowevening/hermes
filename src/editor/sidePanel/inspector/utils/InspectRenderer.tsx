import { Component, ReactNode } from 'react';
import {
  ACESFilmicToneMapping,
  AgXToneMapping,
  CineonToneMapping,
  Color,
  ColorManagement,
  ColorSpace,
  CustomToneMapping,
  LinearSRGBColorSpace,
  LinearToneMapping,
  NeutralToneMapping,
  NoColorSpace,
  NoToneMapping,
  ReinhardToneMapping,
  SRGBColorSpace,
  ToneMapping,
  WebGLRenderer,
} from 'three';
import RemoteThree, { ToolEvents } from '../../../../core/remote/RemoteThree';
import InspectorGroup from '../InspectorGroup';
import MultiView from '../../../multiView/MultiView';

type InspectRendererProps = {
  three: RemoteThree;
}

type InspectRendererState = {
  expanded: boolean;
  lastUpdated: number;
}

export default class InspectRenderer extends Component<InspectRendererProps, InspectRendererState> {
  // Renderer
  private autoClear = true;
  private autoClearColor = true;
  private autoClearDepth = true;
  private autoClearStencil = true;
  private outputColorSpace: ColorSpace = SRGBColorSpace;
  private localClippingEnabled = false;
  private clearColor = new Color(0x000000);
  private clearAlpha = 1;
  private toneMapping: ToneMapping = NoToneMapping;
  private toneMappingExposure = 1;
  private type = '';

  constructor(props: InspectRendererProps) {
    super(props);

    const expandedValue = localStorage.getItem(this.expandedName);
    const expanded = expandedValue !== null ? expandedValue === 'open' : false;

    this.state = {
      expanded: expanded,
      lastUpdated: Date.now(),
    };

    this.saveExpanded(expanded);

    if (MultiView.instance) {
      const renderer = MultiView.instance.renderer;
      if (renderer) {
        this.autoClear = renderer.autoClear;
        this.autoClearColor = renderer.autoClearColor;
        this.autoClearDepth = renderer.autoClearDepth;
        this.autoClearStencil = renderer.autoClearStencil;
        this.clearAlpha = renderer.getClearAlpha();
        this.toneMapping = renderer.toneMapping;
        this.toneMappingExposure = renderer.toneMappingExposure;
        if (renderer instanceof WebGLRenderer) {
          this.localClippingEnabled = renderer.localClippingEnabled;
          renderer.getClearColor(this.clearColor);
        }
      }
    }

    this.props.three.addEventListener(ToolEvents.ADD_RENDERER, this.onAddRenderer);
  }

  componentwillunmount() {
    this.props.three.removeEventListener(ToolEvents.ADD_RENDERER, this.onAddRenderer);
  }

  private onAddRenderer = (evt: any) => {
    const data = evt.value;
    this.autoClear = data.autoClear;
    this.autoClearColor = data.autoClearColor;
    this.autoClearDepth = data.autoClearDepth;
    this.autoClearStencil = data.autoClearStencil;
    this.outputColorSpace = data.outputColorSpace;
    this.localClippingEnabled = data.localClippingEnabled;
    this.clearAlpha = data.clearAlpha;
    this.type = data.type;
    this.toneMapping = data.toneMapping;
    this.toneMappingExposure = data.toneMappingExposure;
    this.clearColor.setStyle(data.clearColor, LinearSRGBColorSpace);
    ColorManagement.enabled = data.colorManagement;

    // Update MultiView renderer
    if (MultiView.instance) {
      const renderer = MultiView.instance.renderer;
      if (renderer) {
        // renderer.autoClear = this.autoClear;
        renderer.autoClearColor = this.autoClearColor;
        // renderer.autoClearDepth = this.autoClearDepth;
        // renderer.autoClearStencil = this.autoClearStencil;
        renderer.outputColorSpace = this.outputColorSpace;
        renderer.localClippingEnabled = this.localClippingEnabled;
        renderer.toneMapping = this.toneMapping;
        renderer.toneMappingExposure = this.toneMappingExposure;
        renderer.setClearColor(data.clearColor, this.clearAlpha);
      }
    }

    this.setState({ lastUpdated: Date.now() });
  };

  render(): ReactNode {
    const updateMultiView = () => {
      if (MultiView.instance) {
        const renderer = MultiView.instance.renderer;
        if (renderer) {
          // renderer.autoClear = this.autoClear;
          renderer.autoClearColor = this.autoClearColor;
          // renderer.autoClearDepth = this.autoClearDepth;
          // renderer.autoClearStencil = this.autoClearStencil;
          renderer.outputColorSpace = this.outputColorSpace;
          renderer.localClippingEnabled = this.localClippingEnabled;
          renderer.toneMapping = this.toneMapping;
          renderer.toneMappingExposure = this.toneMappingExposure;
          renderer.setClearColor(this.clearColor.getStyle(), this.clearAlpha);

          this.props.three.updateRenderer({
            autoClear: this.autoClear,
            autoClearColor: this.autoClearColor,
            autoClearDepth: this.autoClearDepth,
            autoClearStencil: this.autoClearStencil,
            outputColorSpace: this.outputColorSpace,
            localClippingEnabled: this.localClippingEnabled,
            clearAlpha: this.clearAlpha,
            clearColor: this.clearColor.getStyle(),
            colorManagement: ColorManagement.enabled,
            toneMapping: this.toneMapping,
            toneMappingExposure: this.toneMappingExposure,
          });
        }
      }
    };

    return (
      <InspectorGroup
        three={this.props.three}
        key={Math.random()}
        title='Renderer'
        expanded={this.state.expanded}
        items={[
          {
            type: 'boolean',
            title: 'Auto Clear',
            value: this.autoClear,
            onChange: (_: string, value: boolean) => {
              this.autoClear = value;
            }
          },
          {
            type: 'boolean',
            title: 'Auto Clear Color',
            value: this.autoClearColor,
            onChange: (_: string, value: boolean) => {
              this.autoClearColor = value;
              updateMultiView();
            }
          },
          {
            type: 'boolean',
            title: 'Auto Clear Depth',
            value: this.autoClearDepth,
            onChange: (_: string, value: boolean) => {
              this.autoClearDepth = value;
              updateMultiView();
            }
          },
          {
            type: 'boolean',
            title: 'Auto Clear Stencil',
            value: this.autoClearStencil,
            onChange: (_: string, value: boolean) => {
              this.autoClearStencil = value;
              updateMultiView();
            }
          },
          {
            type: 'boolean',
            title: 'Local Clipping',
            value: this.localClippingEnabled,
            onChange: (_, value: boolean) => {
              this.localClippingEnabled = value;
              updateMultiView();
            }
          },
          {
            type: 'color',
            title: 'Clear Color',
            value: `#${this.clearColor.getHexString()}`,
            onChange: (_, value: any) => {
              this.clearColor.setStyle(value);
              updateMultiView();
            }
          },
          {
            type: 'range',
            title: 'Clear Alpha',
            min: 0,
            max: 1,
            step: 0.01,
            value: this.clearAlpha,
            onChange: (_, value: number) => {
              this.clearAlpha = value;
              updateMultiView();
            }
          },
          {
            type: 'boolean',
            title: 'Color Management',
            value: ColorManagement.enabled,
            onChange: (_, value: boolean) => {
              ColorManagement.enabled = value;
              updateMultiView();
            }
          },
          {
            type: 'option',
            title: 'Color Space',
            value: this.outputColorSpace,
            options: [
              {
                title: 'No Color Space',
                value: NoColorSpace,
              },
              {
                title: 'SRB Color Space',
                value: SRGBColorSpace,
              },
              {
                title: 'Linear SRB Color Space',
                value: LinearSRGBColorSpace,
              },
            ],
            onChange: (_: string, value: ColorSpace) => {
              this.outputColorSpace = value;
              updateMultiView();
            }
          },
          {
            type: 'option',
            title: 'Tone Mapping',
            value: this.toneMapping,
            options: [
              {
                title: 'None ',
                value: NoToneMapping ,
              },
              {
                title: 'Linear ',
                value: LinearToneMapping,
              },
              {
                title: 'Reinhard',
                value: ReinhardToneMapping,
              },
              {
                title: 'Cineon ',
                value: CineonToneMapping,
              },
              {
                title: 'ACES Filmic',
                value: ACESFilmicToneMapping,
              },
              {
                title: 'AgX',
                value: AgXToneMapping,
              },
              {
                title: 'Neutral',
                value: NeutralToneMapping,
              },
              {
                title: 'Custom',
                value: CustomToneMapping,
              },
            ],
            onChange: (_: string, value: ToneMapping) => {
              this.toneMapping = value;
              updateMultiView();
            }
          },
          {
            type: 'range',
            title: 'Tone Mapping Exposure',
            value: this.toneMappingExposure,
            min: 0,
            max: 2,
            step: 0.01,
            onChange: (_, value: number) => {
              this.toneMappingExposure = value;
              updateMultiView();
            }
          },
          {
            type: 'string',
            title: 'Type',
            value: this.type,
            disabled: true,
          },
          {
            type: 'button',
            title: 'Resize Scenes from Source',
            onChange: () => {
              this.props.three.requestSize();
            }
          },
        ]}
        onToggle={(value: boolean) => {
          this.setState({ expanded: value });
          this.saveExpanded(value);
        }}
      />
    );
  }

  private saveExpanded(value: boolean) {
    localStorage.setItem(this.expandedName, value ? 'open' : 'closed');
  }

  get expandedName(): string {
    return `${this.props.three.name}_renderer`;
  }
}