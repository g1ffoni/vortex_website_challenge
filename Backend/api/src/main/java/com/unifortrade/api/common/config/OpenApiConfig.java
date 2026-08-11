package com.unifortrade.api.common.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;

@OpenAPIDefinition(
    info = @Info(
        title = "UniforTrade API",
        version = "0.0.1",
        description = """
            Marketplace de economia circular do campus — estudantes anunciam itens \
            (livros, calculadoras, componentes eletrônicos, jalecos, móveis etc.) para \
            venda ou doação a outros estudantes.

            Fluxo de uma transação: uma listing ACTIVE é reivindicada (`POST /{id}/claim`, \
            vira CLAIMED), as duas partes trocam contato (`GET /{id}/contact`) para combinar \
            local e horário, e o vendedor confirma a entrega presencial (`POST /{id}/complete`). \
            Qualquer uma das partes pode desistir antes da entrega (`DELETE /{id}/claim`), o que \
            devolve a listing para ACTIVE.

            A maioria dos endpoints de leitura é pública; escrita e ações de fluxo exigem um \
            usuário autenticado, e endpoints de categoria (além de GET) exigem a role ADMIN.

            Autenticação: o cadastro é `POST /api/users`, que cria a conta e retorna o perfil, \
            mas não devolve tokens. Faça login em `POST /auth/login` para receber o par \
            `accessToken` / `refreshToken`, renove em `POST /auth/refresh` e encerre a sessão \
            no cliente com `POST /auth/logout`. Use o `accessToken` no botão "Authorize" acima \
            para enviá-lo como `Authorization: Bearer <token>`.
            """
    )
)
@SecurityScheme(
    name = "bearerAuth",
    type = SecuritySchemeType.HTTP,
    scheme = "bearer",
    bearerFormat = "JWT",
    description = "Access token returned by POST /auth/login or POST /auth/refresh."
)
public class OpenApiConfig {
}

