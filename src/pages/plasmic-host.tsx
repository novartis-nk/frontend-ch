import * as React from "react";
import {
  PlasmicCanvasHost,
  registerComponent,
  registerGlobalContext,
} from "@plasmicapp/react-web/lib/host";

// --- Other component imports (keep these as they are) ---
import { Fragment, fragmentMeta } from "@/fragment/fragment";
import { GrowthBook, growthBookMeta } from "@/fragment/growthbook";
import { DatePicker, datePickerMeta } from "@/fragment/components/date-picker";
import { TimePicker, timePickerMeta } from "@/fragment/components/time-picker";
import { Splunk, splunkMeta } from "@/fragment/splunk";
import { Popover, popoverMeta } from "@/fragment/components/popover";
import { Select, selectMeta } from "@/fragment/components/select";
import { Input, inputMeta } from "@/fragment/components/input";
import { Switch, switchMeta } from "@/fragment/components/switch";
import { ApiRequest, apiRequestMeta } from "@/fragment/components/api-request";
import { Slider, sliderMeta } from "@/fragment/components/slider";
import { Chart, chartMeta } from "@/fragment/components/chart";
import { Textarea, textareaMeta } from "@/fragment/components/textarea";

// 1. IMPORT YOUR NEW COMPONENT
// Make sure the path is correct for your project structure.
import { VerticalScroller } from "@/components/ui/VerticalScroller";
import { TikTokScroll } from "@/components/ui/TikTokScroll";



export default function PlasmicHost() {
  return <PlasmicCanvasHost />;
}

// --- Your existing registrations (keep these) ---
registerGlobalContext(Fragment, fragmentMeta);
registerGlobalContext(GrowthBook, growthBookMeta);
registerGlobalContext(Splunk, splunkMeta);
registerComponent(DatePicker, datePickerMeta);
registerComponent(TimePicker, timePickerMeta);
registerComponent(Popover, popoverMeta);
registerComponent(Select, selectMeta);
registerComponent(Input, inputMeta);
registerComponent(Switch, switchMeta);
registerComponent(Slider, sliderMeta);
registerComponent(ApiRequest, apiRequestMeta);
registerComponent(Chart, chartMeta);
registerComponent(Textarea, textareaMeta);


registerComponent(TikTokScroll, {
  name: "TikTokScroll",
  displayName: "TikTok Scroll",
  description: "A TikTok-style vertical scroll component",
  importPath: "@/components/ui/TikTokScroll",
  props: {
    posts: {
      type: "array",
      description: "List of posts with image_link, description, desire",
    },
    initialIndex: {
      type: "number",
      defaultValue: 0,
      description: "The initial post index to display",
    },
  },
});


// 3. ADD THE NEW VerticalScroller REGISTRATION
registerComponent(VerticalScroller, {
  name: "VerticalScroller",
  displayName: "Vertical Scroller",
  description: "A container for creating a TikTok-style vertical feed.",
  // Use the same import path as your import statement above
  importPath: "@/components/ui/VerticalScroller",
  props: {
    slides: {
      type: "slot",
      description: "Drop your full-page slides in here. Each direct child will be one slide.",
      // This provides a helpful starting point for the user.
      defaultValue: {
        type: 'vbox',
        children: [
          {
            type: 'vbox',
            styles: {
              width: '100%',
              height: '100vh',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f0f0f0'
            },
            children: {
              type: 'text',
              value: 'This is the first slide. Drag content here!'
            }
          },
          {
            type: 'vbox',
            styles: {
              width: '100%',
              height: '100vh',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#d9d9d9'
            },
            children: {
              type: 'text',
              value: 'This is the second slide. Drag content here!'
            }
          }
        ]
      }
    }
  },
});

