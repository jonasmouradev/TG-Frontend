import { PromiseResponse } from '@core/domain/ports/http-client.port';
import { Step } from '../entities';

// Domain DTOs for Templates
export interface ProcessTemplateDto {
  id: string;
  name: string;
  description: string;
  category?: string;
  isDefault?: boolean;
  stages: Step[];
  companyId?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTemplateDto {
  name: string;
  description: string;
  category?: string;
  stages: Omit<Step, 'id'>[];
  companyId?: string;
}

export interface UpdateTemplateDto {
  name?: string;
  description?: string;
  category?: string;
  stages?: Step[];
}

export interface TemplateFilters {
  companyId?: string;
  category?: string;
  isDefault?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface GetTemplatesResponse {
  templates: ProcessTemplateDto[];
  totalCount: number;
}

// Gateway Interface
export interface TemplateGateway {
  /**
   * Get all available process templates based on filters
   */
  getProcessTemplates(filters?: TemplateFilters): PromiseResponse<GetTemplatesResponse>;

  /**
   * Get a specific template by ID
   */
  getTemplateById(id: string): PromiseResponse<ProcessTemplateDto>;

  /**
   * Create a new process template
   */
  createTemplate(template: CreateTemplateDto): PromiseResponse<ProcessTemplateDto>;

  /**
   * Update an existing template
   */
  updateTemplate(id: string, updates: UpdateTemplateDto): PromiseResponse<ProcessTemplateDto>;

  /**
   * Delete a template
   */
  deleteTemplate(id: string): PromiseResponse<void>;

  /**
   * Duplicate a template
   */
  duplicateTemplate(id: string, name?: string): PromiseResponse<ProcessTemplateDto>;

  /**
   * Get default system templates
   */
  getDefaultTemplates(): PromiseResponse<ProcessTemplateDto[]>;
}
