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


// 1. IMPORT YOUR NEW COMPONENTS & METADATA
import { VerticalScroller } from "@/components/ui/VerticalScroller";
import { verticalScrollerMeta } from "@/components/ui/verticalScrollerMeta";

import { TikTokScroll } from "@/components/ui/TikTokScroll";
import { tikTokScrollMeta } from "@/components/ui/tikTokScrollMeta";





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
registerComponent(VerticalScroller, verticalScrollerMeta);
registerComponent(TikTokScroll, tikTokScrollMeta);


