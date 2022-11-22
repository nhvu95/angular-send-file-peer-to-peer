package com.f2f.backend.utilities;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import com.f2f.backend.ds.FilePart;

public class FileIdGenerator implements IdentifierGenerator {

	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
		Connection connection = session.connection();
		FilePart file = (FilePart) object;
		final long originFileId = file.getOrigin();
		final int index = file.getIndex();
		try {
			Statement statement = connection.createStatement();
			if (index == 0 && originFileId == Constant.ORIGIN_FILE_PART) {
				ResultSet rs = statement.executeQuery("SELECT  nextval('file_id_seq')");
				if (rs.next()) {
					Long id = rs.getLong(1);
					return id;
				}
			} else if (originFileId == Constant.ORIGIN_FILE_PART) {
				ResultSet rs = statement.executeQuery("SELECT  currval('file_id_seq')");
				if (rs.next()) {
					Long id = rs.getLong(1);
					return id;
				}
			} else {
				return originFileId;
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}

		return null;
	}
}