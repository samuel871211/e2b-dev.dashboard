'use server'

import { z } from 'zod'
import { getApiUrl, getUserAccessToken } from '@/lib/utils/server'
import { revalidatePath } from 'next/cache'
import { authActionClient } from '@/lib/clients/action'
import { returnServerError } from '@/lib/utils/action'

const DeleteTemplateParamsSchema = z.object({
  templateId: z.string(),
  teamId: z.string(),
})

export const deleteTemplateAction = authActionClient
  .schema(DeleteTemplateParamsSchema)
  .metadata({ actionName: 'deleteTemplate' })
  .action(async ({ parsedInput, ctx }) => {
    const { templateId, teamId } = parsedInput
    const { url } = await getApiUrl()

    const res = await fetch(`${url}/templates/${templateId}`, {
      method: 'DELETE',
      headers: {
        'X-Supabase-Token': ctx.session.access_token,
        'X-Supabase-Team': teamId,
      },
    })

    if (!res.ok) {
      if (res.status === 404) {
        return returnServerError('Template not found')
      }

      const text = await res.text()
      const statusCode = res.status
      const statusText = res.statusText

      throw new Error(
        `HTTP Error ${statusCode} ${statusText}: ${text || `Failed to delete template: ${templateId}`}`
      )
    }

    revalidatePath(`/dashboard/[teamIdOrSlug]/templates`, 'page')
  })

const UpdateTemplateParamsSchema = z.object({
  templateId: z.string(),
  teamId: z.string(),
  props: z
    .object({
      Public: z.boolean(),
    })
    .partial(),
})

export const updateTemplateAction = authActionClient
  .schema(UpdateTemplateParamsSchema)
  .metadata({ actionName: 'updateTemplate' })
  .action(async ({ parsedInput, ctx }) => {
    const { templateId, teamId, props } = parsedInput
    const { session } = ctx
    const { url } = await getApiUrl()

    const res = await fetch(`${url}/templates/${templateId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Supabase-Token': session.access_token,
        'X-Supabase-Team': teamId,
      },
      body: JSON.stringify(props),
    })

    if (!res.ok) {
      if (res.status === 404) {
        return returnServerError('Template not found')
      }

      const text = await res.text()
      const statusCode = res.status
      const statusText = res.statusText

      throw new Error(
        `HTTP Error ${statusCode} ${statusText}: ${text || `Failed to update template: ${templateId}`}`
      )
    }

    revalidatePath(`/dashboard/[teamIdOrSlug]/templates`, 'page')
  })
