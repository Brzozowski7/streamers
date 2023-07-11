import { Type, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              docs: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
              totalDocs: { type: 'number' },
              limit: { type: 'number' },
              page: { type: 'number' },
              totalPages: { type: 'number' },
              nextPage: { type: 'number' },
              prevPage: { type: 'number' },
              pagingCounter: { type: 'number' },
              hasPrevPage: { type: 'boolean' },
              hasNextPage: { type: 'boolean' },
              meta: {},
            },
          },
        ],
      },
    }),
  );
};
