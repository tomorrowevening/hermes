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
  private autoClearColor = true;
  private outputColorSpace: ColorSpace = SRGBColorSpace;
  private clearColor = new Color(0x000000);
  private clearAlpha = 1;
  private toneMapping: ToneMapping = NoToneMapping;
  private toneMappingExposure = 1;
  private type = '';

  constructor(props: InspectRendererProps) {
    super(props);

    const expandedValue = localStorage.getItem(this.expandedName);
    const expanded = expandedValue !== null ? expandedValue === 'open' : false;

    this.saveExpanded(expanded);

    if (MultiView.instance) {
      const renderer = MultiView.instance.renderer;
      if (renderer) {
        this.autoClearColor = renderer.autoClearColor;
        this.clearAlpha = renderer.getClearAlpha();
        this.toneMapping = renderer.toneMapping;
        this.toneMappingExposure = renderer.toneMappingExposure;
        // @ts-ignore
        this.type = renderer.isWebGLRenderer ? 'WebGLRenderer' : 'WebGPURenderer';
      }
    }

    this.state = {
      expanded: expanded,
      lastUpdated: Date.now(),
    };

    this.props.three.addEventListener(ToolEvents.ADD_RENDERER, this.onAddRenderer);
  }

  componentWillUnmount() {
    this.props.three.removeEventListener(ToolEvents.ADD_RENDERER, this.onAddRenderer);
  }

  private onAddRenderer = (evt: any) => {
    // Only create 1 renderer
    if (MultiView.instance) {
      if (MultiView.instance.renderer) return;
    }

    const data = evt.value;
    this.autoClearColor = data.autoClearColor;
    this.outputColorSpace = data.outputColorSpace;
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
        renderer.autoClearColor = this.autoClearColor;
        renderer.outputColorSpace = this.outputColorSpace;
        renderer.toneMapping = this.toneMapping;
        renderer.toneMappingExposure = this.toneMappingExposure;
        renderer.setClearColor(data.clearColor, this.clearAlpha);
        // @ts-ignore
        this.type = renderer.isWebGLRenderer ? 'WebGLRenderer' : 'WebGPURenderer';
      }
    }

    this.setState({ lastUpdated: Date.now() });
  };

  render(): ReactNode {
    const updateMultiView = () => {
      if (MultiView.instance) {
        const renderer = MultiView.instance.renderer;
        if (renderer) {
          renderer.autoClearColor = this.autoClearColor;
          renderer.outputColorSpace = this.outputColorSpace;
          renderer.toneMapping = this.toneMapping;
          renderer.toneMappingExposure = this.toneMappingExposure;
          renderer.setClearColor(this.clearColor.getStyle(), this.clearAlpha);

          this.props.three.updateRenderer({
            autoClearColor: this.autoClearColor,
            outputColorSpace: this.outputColorSpace,
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
        key='renderer'
        title='Renderer'
        expanded={this.state.expanded}
        items={[
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