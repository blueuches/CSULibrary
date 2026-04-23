<template>
	<aside class="space-y-5">
		<section class="rounded-2xl border border-[#c2d4cb] bg-white p-4">
			<p class="text-xs font-semibold uppercase tracking-widest text-[#4a7060]">Report Scope</p>
			<div class="mt-3 grid grid-cols-3 gap-2">
				<button
					v-for="opt in reportTypes"
					:key="opt.value"
					class="rounded-xl border px-3 py-2 text-xs font-semibold uppercase tracking-wide transition"
					:class="
						modelValue === opt.value
							? 'border-[#0d2b0f] bg-[#0d2b0f] text-white'
							: 'border-[#c2d4cb] bg-[#f4f8f5] text-[#3d6455] hover:border-[#0d2b0f]'
					"
					@click="$emit('update:modelValue', opt.value)"
				>
					{{ opt.label }}
				</button>
			</div>
		</section>

		<section class="rounded-2xl border border-[#c2d4cb] bg-white p-4">
			<p class="text-xs font-semibold uppercase tracking-widest text-[#4a7060]">Guide</p>
			<ul class="mt-3 space-y-2 text-sm text-[#3d6455]">
				<li>ALL: Daily totals and summary table.</li>
				<li>BY COLLEGE: Multi-chart breakdown by program/year level.</li>
				<li>SPECIFIC: Focused analytics cards with targeted PDF outputs.</li>
			</ul>
		</section>
	</aside>
</template>

<script setup lang="ts">
import type { ReportType } from '../Composables/useReportData'

defineProps<{
	modelValue: ReportType
}>()

defineEmits<{
	'update:modelValue': [value: ReportType]
}>()

const reportTypes: { label: string; value: ReportType }[] = [
	{ label: 'ALL', value: 'all' },
	{ label: 'BY COLLEGE', value: 'college' },
	{ label: 'SPECIFIC', value: 'specific' },
]
</script>
