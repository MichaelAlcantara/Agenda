package io.github.michaelAlcantara.agendaapi.model.repository;

import io.github.michaelAlcantara.agendaapi.model.entity.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository extends JpaRepository<Contato, Integer> {
}
