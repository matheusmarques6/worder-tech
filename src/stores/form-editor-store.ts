import { create } from "zustand";
import type {
  PopupStep,
  PopupStepData,
  PopupBlock,
  DisplayRules,
  TargetingRules,
  FrequencyRules,
  PopupStyles,
} from "@/lib/mock-data/forms";
import {
  defaultPopupSteps,
  defaultDisplayRules,
  defaultTargetingRules,
  defaultFrequencyRules,
  defaultPopupStyles,
} from "@/lib/mock-data/forms";

interface FormEditorState {
  // Data
  name: string;
  steps: PopupStepData[];
  activeStep: PopupStep;
  selectedBlockId: string | null;
  displayRules: DisplayRules;
  targetingRules: TargetingRules;
  frequencyRules: FrequencyRules;
  styles: PopupStyles;
  previewDevice: "desktop" | "tablet" | "phone";

  // Actions
  setName: (name: string) => void;
  setActiveStep: (step: PopupStep) => void;
  selectBlock: (id: string | null) => void;
  updateBlock: (stepId: PopupStep, blockId: string, updates: Partial<PopupBlock>) => void;
  addBlock: (stepId: PopupStep, block: PopupBlock) => void;
  removeBlock: (stepId: PopupStep, blockId: string) => void;
  setDisplayRules: (rules: Partial<DisplayRules>) => void;
  setTargetingRules: (rules: Partial<TargetingRules>) => void;
  setFrequencyRules: (rules: Partial<FrequencyRules>) => void;
  setStyles: (styles: Partial<PopupStyles>) => void;
  setPreviewDevice: (device: "desktop" | "tablet" | "phone") => void;
}

let blockCounter = 100;

export const useFormEditorStore = create<FormEditorState>((set) => ({
  name: "POPUP PRINCIPAL [MOBILE]",
  steps: defaultPopupSteps,
  activeStep: "optin",
  selectedBlockId: null,
  displayRules: defaultDisplayRules,
  targetingRules: defaultTargetingRules,
  frequencyRules: defaultFrequencyRules,
  styles: defaultPopupStyles,
  previewDevice: "phone",

  setName: (name) => set({ name }),
  setActiveStep: (step) => set({ activeStep: step, selectedBlockId: null }),
  selectBlock: (id) => set({ selectedBlockId: id }),

  updateBlock: (stepId, blockId, updates) =>
    set((state) => ({
      steps: state.steps.map((s) =>
        s.id === stepId
          ? {
              ...s,
              blocks: s.blocks.map((b) =>
                b.id === blockId ? { ...b, ...updates } : b
              ),
            }
          : s
      ),
    })),

  addBlock: (stepId, block) => {
    blockCounter += 1;
    const newBlock = { ...block, id: `block-${blockCounter}` };
    set((state) => ({
      steps: state.steps.map((s) =>
        s.id === stepId ? { ...s, blocks: [...s.blocks, newBlock] } : s
      ),
      selectedBlockId: newBlock.id,
    }));
  },

  removeBlock: (stepId, blockId) =>
    set((state) => ({
      steps: state.steps.map((s) =>
        s.id === stepId
          ? { ...s, blocks: s.blocks.filter((b) => b.id !== blockId) }
          : s
      ),
      selectedBlockId:
        state.selectedBlockId === blockId ? null : state.selectedBlockId,
    })),

  setDisplayRules: (rules) =>
    set((state) => ({ displayRules: { ...state.displayRules, ...rules } })),

  setTargetingRules: (rules) =>
    set((state) => ({ targetingRules: { ...state.targetingRules, ...rules } })),

  setFrequencyRules: (rules) =>
    set((state) => ({ frequencyRules: { ...state.frequencyRules, ...rules } })),

  setStyles: (styles) =>
    set((state) => ({ styles: { ...state.styles, ...styles } })),

  setPreviewDevice: (device) => set({ previewDevice: device }),
}));
