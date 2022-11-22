package com.f2f.backend.ds;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

// JPA cannot create SEQ without Entity so I created this
@Entity
public class Stamp implements Serializable {
  @SequenceGenerator(name="file_id_seq", sequenceName="file_id_seq", initialValue = 1, allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "file_id_seq")
  @Id
  private Long id;
}