import { PromiseResponse } from '@core/domain/ports/http-client.port';

// Domain DTOs for Templates
export interface ProcessStageDto {
  id?: string;
  name: string;
  type: 'screening' | 'interview' | 'test' | 'custom';
  description: string;
  duration?: string;
  responsible?: string;
  autoNotify?: boolean;
  order?: number;
}

export interface ProcessTemplateDto {
  id: string;
  name: string;
  description: string;
  category?: string;
  isDefault?: boolean;
  stages: ProcessStageDto[];
  companyId?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTemplateDto {
  name: string;
  description: string;
  category?: string;
  stages: Omit<ProcessStageDto, 'id'>[];
  companyId?: string;
}

export interface UpdateTemplateDto {
  name?: string;
  description?: string;
  category?: string;
  stages?: ProcessStageDto[];
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
