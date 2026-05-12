"use client"

import { useState } from "react"
import { DocumentTypeSelection } from "@/components/flow/document-type-selection"
import { JurisdictionContext } from "@/components/flow/jurisdiction-context"
import { GuidedQuestions } from "@/components/flow/guided-questions"
import { LegalDisclaimer } from "@/components/flow/legal-disclaimer"
import { LoadingGeneration } from "@/components/flow/loading-generation"
import { DocumentPreview } from "@/components/flow/document-preview"

export type DocumentType =
  | "nda-mutual"
  | "nda-non-mutual"
  | "privacy-policy"
  | "terms-of-service"
  | "freelance-agreement"
  | "employment-agreement"
  | "partnership-agreement"

export interface FlowState {
  step: number
  documentType: DocumentType | null
  country: string | null
  region: string | null
  language: string | null
  businessType: "individual" | "company" | null
  answers: Record<string, string>
  isGenerating: boolean
}

export default function DocumentFlow() {
  const [state, setState] = useState<FlowState>({
    step: 1,
    documentType: null,
    country: null,
    region: null,
    language: null,
    businessType: null,
    answers: {},
    isGenerating: false,
  })

  const handleNext = (updates: Partial<FlowState>) => {
    setState((prev) => ({
      ...prev,
      ...updates,
      step: prev.step + 1,
    }))
  }

  const handleBack = () => {
    setState((prev) => ({
      ...prev,
      step: Math.max(1, prev.step - 1),
    }))
  }

  const handleGenerate = () => {
    setState((prev) => ({
      ...prev,
      isGenerating: true,
      step: 5,
    }))
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        isGenerating: false,
        step: 6,
      }))
    }, 4000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background accent */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-400/5 rounded-full blur-3xl" />
      </div>

      <main className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Progress indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-300">Step {state.step} of 6</h2>
              <div className="text-xs text-slate-400">{Math.round((state.step / 6) * 100)}%</div>
            </div>
            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${(state.step / 6) * 100}%` }}
              />
            </div>
          </div>

          {/* Step content */}
          {state.step === 1 && (
            <DocumentTypeSelection
              selected={state.documentType}
              onSelect={(docType) => handleNext({ documentType: docType })}
            />
          )}

          {state.step === 2 && (
            <JurisdictionContext
              country={state.country}
              region={state.region}
              language={state.language}
              businessType={state.businessType}
              onContinue={(data) =>
                handleNext({
                  country: data.country,
                  region: data.region,
                  language: data.language,
                  businessType: data.businessType,
                })
              }
              onBack={handleBack}
            />
          )}

          {state.step === 3 && (
            <GuidedQuestions
              documentType={state.documentType!}
              answers={state.answers}
              onSave={(answers) => handleNext({ answers })}
              onBack={handleBack}
            />
          )}

          {state.step === 4 && <LegalDisclaimer onAccept={handleGenerate} onBack={handleBack} />}

          {state.step === 5 && state.isGenerating && <LoadingGeneration />}

          {state.step === 6 && !state.isGenerating && (
            <DocumentPreview
              documentType={state.documentType!}
              country={state.country!}
              onBack={() => setState((prev) => ({ ...prev, step: 1, documentType: null }))}
            />
          )}
        </div>
      </main>
    </div>
  )
}
